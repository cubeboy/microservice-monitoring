## Chapter 01 : CDK 프로젝트 생성

> AWS CDK 는 program language 이용해 AWS 자원과 서비스를 코드로 정의하고 CloudFormation 을 통해 배포 할 수 있도록 해주는 AWS Cloud 개발 프레임워크 입니다. <br/>
> 다양한 개발 언어를 지원하지만 본 학습에서는 typescript 를 사용합니다.
> ### 장점
> 1. 자원 생성과 배포를 코드로 관리 하기 때문에 반복적인 자원 생성 작업의 부담을 줄인다.
> 2. Web Console 로 작업하는 경우 휴먼 에러를 찾기 어렵지만 CDK 는 코드로 기록이 남기 때문에 무엇이 잘못되었는지 오류를 재현하고 확인 하는데 용이하다.
> 3. CLI 에 비해서 자원과 서비스를 정규화 하고 체계적으로 관리하는데 효과 적이다.
> ### 단점
> 1. AWS 에 종속적이기 때문에 Azure, GCP 등 Flatform 이동시 재사용이 불가하다.
> <br/>
<br/>

---
## 01-01 cdk 프로젝트 scafolding
---
### 1. AWS CDK CLI 설치
> AWS CDK CLI 를 전역에 설치하고 cdk 버전을 출력해서 설치 확인을 진행 합니다.
```bash
npm install -g aws-cdk
cdk --version
```
> 2022.06.10 기준 최신버전 : 2.27.0 (build 8e89048)

<br/>

### 2. AWS 계정 부트스트래핑
> CDK 스택은 스택과함께 배포되는 외부파일(Docker Image, Lamda function 등) 을 Amazon S3 Bucket 또는 기타 컨테이너에 업로드 하고 CloudFormation 을 구성 할 수 있는 역할 그룹 등이 필요 하다.<br/>
> 부트스래핑은 CDK 를 실행하는데 필요한 자원과 역할등을 최초 구성하는 과정이다.<br/>
> AWS 내부에 자원을 생성 하기 때문에 PC를 교체 하더라도 IAM 계정만 동일하게 사용한다면 한번만 구성하면 된다.<br/>
> br/>
> 먼저 아래 명령어로 현재 구성된 계정 정보를 확인 한다.<br/>
```bash
aws sts get-caller-identity
{
   "UserId": "AIDARZARXXXXXXXXXXXXX",
   "Account": "{Account}",
   "Arn": "arn:aws:iam::xxxxxxxxxxx:user/xxxxxxxxx.user1"
}
```
<br/>

> 위 구성 정보를 이용해 cdk 부트스트래핑 명령어를 입력
```bash
cdk bootstrap aws://{Account}/ap-northeast-2
```

> 부트스트래핑 구성이 성공적으로 완료 되었다면 **AWS Management Console > CloudFormation** 에 접속해서 *CDKToolKit* 이라는 이름의 스택이 생성 되었는지 확인 한다.
> > **주의** CloudFormation 에서 생성된 스택이 보이지 않는다면 화면 상단의 region 이 부트스트랩이 실행된 리전 (ap-northeast-2) 와 동일한지 확인한다.
<br/>
<br/>

### 3. CDK 프로젝트 생성
> 프로젝트 폴더를 만들고 cdk 프로젝트 초기화를 진행해 기본 코드 탬플릿을 만든다.
```
mkdir cdk-monitoring
cd cdk-monitoring
cdk init --language typescript
```
> > **주의** cdk init 과정 중 아래와 같은 오류가 발생해서 *node_modules* 폴더가 생성되지 않는다면 npm cash clear 를 수행하고 npm install 을 수행한다<br/>
> > - Cannot read properties of null (reading 'pickAlgorithm')
> > ```
> > npm cache clear --force
> > npm install
> > ```

> 프로젝트가 생성 되었다면 *./bin/cdk-monitoring.ts* 파일에 Account 와 Region 정보를 수정 한다.
```typescript
  const app = new cdk.App();
  new CdkMonitoringStack(app, 'CdkMonitoringStack', {
    env: { account: '{Account}', region: 'ap-northeast-2' },
  });
```
> 이제 sdk 를 이용한 aws resource 조작을 위한 준비가 완료 되었다.

### 4. Subnet 만들기
> 간단한 subnet 을 생성/삭제 해서 aws resource 조작을 연습 해 보자.
> vpc, subnet, ec2 등을 생성하기 위한 CDK 라이브러리 cdk-ec2 모듈을 설치 한다.
> ```
> npm install @aws-cdk/aws-ec2
> ```
> package.json 파일에 npm 모듈정보 확인
```typescript
 "dependencies": {
    "@aws-cdk/aws-ec2": "^1.159.0",
```
> git history '01-01 cdk 프로젝트 scafolding' 의 내용을 참조하여 *lib/cdk-monitoring-stack.ts* 파일을 편집한다.<br/>
> 프로젝트 폴더에서 deploy 명령어를 실행해 subnet 을 생성한다.
> ```
> cdk deploy
> ```
>
> [aws management console](https://aws.amazon.com/ko/console/)에 접속해서 CloudFormation, VPC, Subnet 등의 항목들이 생성 되었는지 확인 한다.<br/>
> 프로젝트 폴더에서 destroy 명령어를 실행해 resource 삭제 한다. (AWS Resource 는 거의 대부분 돈과 연결된다)
> ```
> cdk destroy
> ```
> [aws management console](https://aws.amazon.com/ko/console/) 에 접속해서 CloudFormation, VPC, Subnet 등의 항목들이 삭제 되었는지 확인 한다. <br/>
> <br/>
> 이제 다양한 AWS 자원들을 생성하고 조작할 준비가 완료 되었다.<br/>
> 보다 자세한 CDK API 관련 내용은 아래 링크를 참조하도록 하자.<br />
> [AWS CDK Reference Documentation](https://docs.aws.amazon.com/cdk/api/v2)<br/>
