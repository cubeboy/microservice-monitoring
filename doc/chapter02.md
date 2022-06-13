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

---
## 02-02 EKS Cluster 만들기
---
### 2. EKS Cluster 생성 코드 만들기
> commit history 02-01 의 내용을 참조해 *lib/cdk-monitoring-stack.ts* 을 수정한다.
```typescript
import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as account from '../resources/account';
import { EKS_SUBNET } from '../resources/subnet';

....
```
> 프리티어로 사용할 수 있는 micro size 의 worknode 인스턴스는 2개 이상의 ip 를 할당 할수 없다.<br/>
> 따라서 해당 소스에 있는 T3.large 정도의 사이즈는 되어야 이후의 예제를 실행 할 수 있다.<br/>
```typescript
  eksCluster.addAutoScalingGroupCapacity(id + '-worknode', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.LARGE),
```
> EKS Cluster 는 기본적으로 해당 region 에서 제공하믄 모든 가용영역을 순차적으로 할당한다.<br/>
> ap-northeast-2 의 경우 a~d 까지 4개의 가용역역을 제공하므로 4개의 가용역역을 순차적으로 Subnet 에 할당하게 된다. (a, b, c, d 순서)<br/>
> 아래 함수는 (a, c) 2개의 가용영역을 순차적으로 할당 하도록 제한하는 기능을 한다.<br/>
```typescript
  get availabilityZones(): string[] {
    return ['ap-northeast-2a', 'ap-northeast-2c'];
  }
```
> 코드를 모두 작성 하였다면 cdk deploy 명령어를 실행 해서 클러스터를 생성한다.<br/>
> 클러스터 생성에는 15~20분 정도의 시간이 소요되므로 명령어를 취소하지 말고 기다린다.<br/>
> 10~20분 가량 기다리면 완료 메시지가 출력된다.<br/>
> 완료 메시지 마지막의 'Outputs:' 정보를 복사 한다.<br/>
> ```bash
> Outputs:
> CdkEksStack.CdkEksStackclusterConfigCommandE23FF0B9 = aws eks update-kubeconfig --name CdkEksStackclusterB4E ~
> CdkEksStack.CdkEksStackclusterGetTokenCommandB262A3E2 = aws eks get-token --cluster-name CdkEksStackclusterB4E ~
> ```
> Outpus 메시지 의 *aws eks update-kubeconfig ~* 와 *aws eks get-toke ~* 부분을 복사해서 순서대로 실행 한다.</br>
> 두개의 명령어를 모두 실행 하지 않으면 권한 오류가 발생 하므로 반드시 실행 해야하며 클러스터를 삭제 후 신규 생성할 경우 인증 토큰이 변경 되므로 신규 생성 시 마다 실행 해야 한다.<br/>
> 권한 등록을 완료하게 되면 아래 명령어를 실행해서 기본 서비스 상태를 확인하자.
> ```bash
> kubectl get pod --all-namespaces
> ```
> 모든 작업이 완료되었다면 비용청구를 예방하기위해 모든 자원을 삭제 한다.</br>
> 삭제 작업은 생성작업보다 훨씬 오래 걸리지만 중단하지 말고 끈기있게 기다리자
> ```bash
> cdk destroy
> ```
>