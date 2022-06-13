import * as ec2 from 'aws-cdk-lib/aws-ec2';

/** 모니터링 구성을 위한 서브넷 리스트 */
export const EKS_SUBNET = [
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
