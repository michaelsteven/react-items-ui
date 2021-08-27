# react-items-api

## Available Scripts

In the project directory, you can run:
### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Containerization

### Docker Build
```
docker build --squash -t michaelsteven/react-items-ui:latest .
```

### Docker Push
```
docker push michaelsteven/react-items-ui:latest
```

### Helm Deployment
Dry Run:
```
helm install -f manifests/helm/react-items-ui/Chart.yaml react-items-ui -n dev --dry-run ./manifests/helm/react-items-ui
```
Install:
```
helm install -f manifests/helm/react-items-ui/Chart.yaml react-items-ui -n dev ./manifests/helm/react-items-ui
```
Upgrade:
```
helm upgrade -f manifests/helm/react-items-ui/Chart.yaml react-items-ui -n dev ./manifests/helm/react-items-ui
```
