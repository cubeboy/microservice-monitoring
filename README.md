# Microservice Monitoring by Prometheus & Grafana

본 학습 문서는 AWS CDK 를 이용해 테스트를 위한 간단한 EKS Cluster 를 구성하고 모니터링을 위한 데모 java application 을 설치한 후 helm chart 를 이용해 Prometheus & Grafana 모니터링 환경을 구성 하는 것을 목표로 한다.<br/>
EKS 환경의 모니터링 환경 구축에 집중하기 위해 학습 문서에 나오는 특정 기술들(*typescript, cdk, helm 등*)은 학습을 위한 최소한의 설명만을 다루며 때문에 해당 기술에 대한 보다 자세한 정보는 다른 학습 자료를 참조 하도록 한다.  <br/>
각 챕터별로 사전 준비작업이 있으며 학습 진행 전에 사전중비 작업을 먼저 진행 하도록 한다.<br/>
학습내용의 환경은 Linux OS 기반의 환경에서 진행 되었다.<br/>
학습내용의 개발도구는 VSCODE 기반으로 진행 하였으나 다른 개발 도구(UltraEdit, WebStorm 등)를 사용하여도 무방하다.<br/>
학습내용은 단계별로 git history 가 기록되어 있다.<br/>
단계별로 해당 commit 을 checkout 하여 해당 시점의 소스코드를 참조하며 학습을 진행 할 것을 권장한다.<br/>
본 학습을 진행하기 위해서는 반드시 AWS Account 가 필요하다.<br/>
본 학습을 진행 할 경우 프리티어 서비스만으로는 진행할 수 없는 부분이 있다.<br/>
본학습에서 권장하는 방법으로 진행시 $2~$3 (8시간 기준) 정도의 비용이 청구 될 수 있다.<br/>

## Chapter 01 : CDK 프로젝트 생성
> - 학습 문서 : [./doc/chapter01.md](./doc/chapter01.md)
> - git commit history : 01-01 ~ 01-02
>### 사전 준비작업
> >1. widnows10 or 11 환경에서는 WSL2 구성 : [WSL 설치](https://docs.microsoft.com/ko-kr/windows/wsl/install)
> >1. aws cli 설치 : [aws cli 시작하기](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/cli-chap-getting-started.html)
> >1. aws cli iam 계정 구성 설정 : [구성 및 자격 증명 파일 설정](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/cli-configure-files.html)
> >1. node.js 설치 : [node.js](https://nodejs.org/en/)
<br/>

## Chapter 02 : EKS Cluster 생성
> - 학습 문서 : [./doc/chapter02.md](./doc/chapter02.md)
> - git commit history : 02-01 ~ 02-02
>### 사전 준비작업
> >1. kubectl 설치 : [kubectl 설치](https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/install-kubectl.html)
> >1. eksctl 설치 : [eksctl 설치](https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/eksctl.html)
> >
<br/>

## Chapter 03 : EKS Cluster 에 Monitoring Service 배포하기
> - 학습 문서 : [./doc/chapter03.md](./doc/chapter03.md)
> - git commit history : 03-01 ~ 03-03
>### 사전 준비작업
> >1. helm 설치 : [helm 설치](https://helm.sh/docs/intro/install/)
<br/>

## Chapter 04 : Loki & Fromtail 로 Log Monitoring 구성
> - 학습 문서 : [./doc/chapter04.md](./doc/chapter04.md)
> - git commit history : 04-01 ~ 04-02
>### 사전 준비 작업 없음
<br/>

## Chapter 05 : 필터링과 검색이 가능한 대시보드 만들기
> - 학습 문서 : [./doc/chapter05.md](./doc/chapter05.md)
> - git commit history : 05-01
>### 사전 준비 작업 없음
<br/>

## Chapter 06 : SpringBoot Actuator & Prometheus Monitoring
> - 학습 문서 : [./doc/chapter06.md](./doc/chapter06.md)
> - git commit history : 06-01 ~ 06-02
>### 사전 준비 작업 없음
<br/>

## Chapter 07 : S3 Storage 를 Loki Log 저장소로 사용 하기
> - 학습 문서 : [./doc/chapter07.md](./doc/chapter07.md)
> - git history : 07-01
>### 사전 준비 작업 없음

## Chapter 08 : Grafana Monitoring and Alert Setting Manual
> - 학습 문서 : [./doc/chapter08.md](./doc/chapter08.md)
> - git history : 08-02
>### 사전 준비 작업 없음