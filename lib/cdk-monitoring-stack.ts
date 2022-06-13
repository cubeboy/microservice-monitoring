import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as account from '../resources/account';
import { EKS_SUBNET } from '../resources/subnet';

export class CdkMonitoringStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'EksVpc',{
      vpcName: 'EksVpc',
      cidr: '10.0.0.0/16',
      maxAzs: 2,
      subnetConfiguration:  EKS_SUBNET,
    });

    const adminUser = new iam.User(this, account.USER_NAME);
    
    const iamRole = new iam.Role(this, id + '-rootRole', {
      assumedBy: new iam.AccountPrincipal(this.account)
    });

    const eksCluster = new eks.Cluster(this, id + '-cluster', {
      version: eks.KubernetesVersion.V1_21,
      endpointAccess: eks.EndpointAccess.PUBLIC,
      vpc: vpc,
      mastersRole: iamRole,
      defaultCapacity: 1
    });

    eksCluster.awsAuth.addUserMapping(adminUser, { groups: [ "system.masters" ]});

    eksCluster.addAutoScalingGroupCapacity(id + '-worknode', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.LARGE),
      minCapacity: 1,
      maxCapacity: 2,
      vpcSubnets: { subnets: vpc.privateSubnets }
    });
  }

  get availabilityZones(): string[] {
    return ['ap-northeast-2a', 'ap-northeast-2c'];
  }
}
