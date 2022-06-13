## Chapter 04 : Loki & Fromtail 로 Log Monitoring 구성

**04-01 helm chart 로 loki stack & promtail 설치하기**

---
## helm chart 로 loki stack & promtail 설치하기
---
> 당문서에서는 EKS Cluster 의 pod 로 배포된 Application Log 를 터미널에 접속하지 않고 Grafana Dashboard 로 확인 할 수 있는 환경구축을 목표로 한다.<br/>
> Chapter04 에서 구성한 Sample Application 과 Prometheus & Grafana Monitoring 환경에 loki stack 환경을 추가 해서 진행 할 것이므로 Chapter03 까지의 설치 과정이 진행된 상태에서 실습을 진행 하도록 한다.<br/>
> <br/>
> loki helm chart repository 를 추가 하고 loki stack 이 추가 되었는지 확인 한다.
```bash
helm repo add loki https://grafana.github.io/loki/charts
helm repo update
helm search repo | grep loki
```
> helm 명령어를 이용해 loki 와 promtail 을 cluster 에 배포 한다.
```bash
helm upgrade --install loki --namespace=monitoring loki/loki-stack
```   
> 정상적으로 설치가 되었다면 1개의 loki 서비스와 2개의 promtail pod 설치를 확인 한다.
> *promtail 은 worker node 의 숫자만큼 설치된다.*
```bash
kubectl get svc -n monitoring | grep loki
kubectl get pods -n monitoring | grep promtail
```
> Grafana 화면에서 *Configuration -> datasources* 메뉴로 이동 해서 **loki**  datasource 가 추가 되었는지 확인 하자.<br/>
> > ![datasource-loki](./img/datasource-loki.png)<br/>
>
> **구성요소별 기능**<br/>
> > **loki** : 로그 처리 기능을 담당하는 독립적인 서버 구성 요소
> > - 로그 수집 모듈들을 위한 WEB API Interface 를 제공
> > - 수집된 로그를 Grafana 에게 제공하거나 저장/백업하는 등의 기능 제공
> > <br/>
> >
> > **promtail** : worker node 단위로 설치되어 해당 서버의 로그 파일을 추적, 로그를 수집해서 loki 서버로 전달하는 기능을 담당
> > - loki 가 제공하는 WEB API 를 호출해서 로그 파일 정보를 loki 서버로 전송
> > - 기본적으로 volume mount 된 경로 2개를 추적 가능
> > 1. *docker : /var/lib/docker/containers*
> > 1. *pods : /var/log/pods*
> > - 필요한 경우 volume.yaml 을 구성해서 추가적인 로그 추적 경로 구성 가능
> > - volume.yaml 에 대한 구성은 [여기](https://raw.githubusercontent.com/grafana/loki/master/production/helm/promtail/values.yaml)를 참조 <br/>
> > 이후 학습에서 values.yaml 을 설정하는 다양한 방법을 알아본다.
<br/>

