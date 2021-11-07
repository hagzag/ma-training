# training

## get code

```sh
git clone https://github.com/hagzag/ma-training.git
cd ma-training
```

## cleanup for just in case ...

```sh
k3d cluster delete --all
```

## create cluster with registry

```sh
k3d cluster create nodejs-demo --registry-create nodejs-demo-registry
```
## validate cluster is runnning 

```sh
kubectl cluster-info
```

## migrate docker-compose to k8s deployments / services

1. start remote images - e.g redis

```yaml
version: '3.3'

services:

    redis:
        ports:
            - '6379:6379'
        container_name: service-discovery-redis
        image: redis
        volumes:
            - ${PWD}/.ServiceDiscovery:/data
```
get image name by running:

```sh
Using default tag: latest
latest: Pulling from library/redis
Digest: sha256:a89cb097693dd354de598d279c304a1c73ee550fbfff6d9ee515568e0c749cfe
Status: Image is up to date for redis:latest
docker.io/library/redis:latest
```

in ourput `docker.io/library/redis:latest` latest digest sha `sha256:a89cb097693dd354de598d279c304a1c73ee550fbfff6d9ee515568e0c749cfe` which is the exact version of the image



## Generate deployemnt.yaml

```sh
kubectl create deployment --image=docker.io/library/redis:latest:sha256@a89cb097693dd354de598d279c304a1c73ee550fbfff6d9ee515568e0c749cfe redis --port=6379 --dry-run -oyaml > ./deployment/redis/deployment.yaml
```

## apply deployment from `./deployment/redis/deployment.yaml`

```sh
kubectl apply -f ./deployment/redis/deployment.yaml
```

## check redis

```sh
kubectl get po 
NAME                     READY   STATUS    RESTARTS   AGE
redis-7cbf86f845-rnck2   1/1     Running   0          88m

```

## using port-froward to pod (part fo the deployment)

(like docker run `without -p`)

```sh
kubectl port-forward   redis-7cbf86f845-rnck2 6379:6379
```

> note: replicase id + instance Id will differ when you ru locally

## using service to expose a deployment to other services in the cluster

## generate the service file `./deployment/redis/svc.yaml`

```sh
kubectl expose deployment redis --port=6379 --dry-run=client -oyaml > ./deployment/redis/svc.yaml
```

```yaml
apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: redis
  name: service-discovery-redis
spec:
  ports:
  - port: 6379
    protocol: TCP
    targetPort: 6379
  selector:
    app: redis
status:
  loadBalancer: {}
```

## apply deployment from `./deployment/redis/svc.yaml`

```sh
kubectl apply -f ./deployment/redis/svc.yaml
```

## using port-froward to svc (points to the deployment instance / replica)

```sh
kubectl port-forward svc/service-discovery-redis 6379:6379
```