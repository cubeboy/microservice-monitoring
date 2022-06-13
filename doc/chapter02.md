## Chapter 02 : EKS Cluster 생성

> Prometheus & Grafana 모니터링 환경을 구성하기 위한 EKS Cluster 를 구성한다.
> Web Console 또는 AWS CLI 를 이용해서 EKS Cluster 를 구성해도 Chapter03 이후의 학습 진행에는 문제없다.


> 먼저 Chapter02 에서 만든 VPC 와 Subnet 환경은 그대로 사용한다.<br/>
> 하지만 코드가 길어져서 가독성이 떨어 지므로 Subnet 정보를 별도 파일로 분리해서 진행 하도록 수정한다.

---
## 02-01 Subnet 정보 분리하기
---

### 1. subnet 파일 만들기
> *./resources/subnet.ts* 파일을 만든다.<br/>
> commit history 02-01 의 내용을 참조해 subnet.ts 파일을 작성한다.<br/>
```typescript
import * as ec2 from 'aws-cdk-lib/aws-ec2';
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
```
> commit history 02-01 의 내용을 참조해 *lib/cdk-monitoring-stack.ts* 을 수정한다.
```typescript
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
```
> Chapter01 에서 작성한 코드와 동일하게 작동하지만 subnet 부분만 분리해서 관리하도록 수정되었다.<br/>
> 가변적인 부분은 별도 모듈로 분리해서 관리하면 코드의 가독성과 변경 관리에 유연하게 대처 할 수 있다.<br/>
<br/>
