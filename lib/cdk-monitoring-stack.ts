import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

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
  }
}
