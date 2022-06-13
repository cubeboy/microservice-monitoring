import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkMonitoringStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const CDK_SUBNET = [
      {
        cidrMask: 24,
        name: 'PublicSubnet',
        subnetType: ec2.SubnetType.PUBLIC,
      }, {
        cidrMask: 24,
        name: 'PrivateSubnet',
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      },
    ];

    const vpc = new ec2.Vpc(this, 'CdkMonitoringVpc',{
      vpcName: 'CdkMonitoringVpc',
      cidr: '1.0.0.0/20',
      maxAzs: 2,
      subnetConfiguration:  CDK_SUBNET,
    });
  }
}
