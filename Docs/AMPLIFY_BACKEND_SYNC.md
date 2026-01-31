

# Quick Reference: Amplify Setup & Sync

- `npm install -g @aws-amplify/cli`
- `amplify configure`
- `amplify pull --appId <your-app-id> --envName <your-env-name>`
- `amplify add api` (choose GraphQL, edit schema, then `amplify push`)
- `amplify add auth` (configure, then `amplify push`)
- `npm install aws-amplify @aws-amplify/ui-react`
- Configure Amplify in your React app:
  ```js
  import Amplify from 'aws-amplify';
  import awsExports from './aws-exports';
  Amplify.configure(awsExports);
  ```
- Use Amplify UI components as needed
- To sync changes from Studio: `amplify pull`
- To deploy local changes: `amplify push`
- In Amplify Console, connect your frontend branch to the correct backend environment (App settings > Backend environments)
## 9. Connecting Frontend Branch to Backend Environment

To connect your frontend branch to a backend environment in the Amplify Console:

1. Go to the AWS Amplify Console for your app.
2. Navigate to **App settings** > **Backend environments**.
3. Find your frontend branch and select **Edit** or **Connect backend**.
4. Choose the backend environment (e.g., `dev`) you want this branch to use.
5. Save your changes.

This ensures your frontend deployments are linked to the correct backend resources and environment variables.

# Amplify Backend Environment Setup and Sync

This guide explains how to connect your local project to an existing AWS Amplify backend environment and keep it in sync.

## 1. Prerequisites
- AWS Amplify backend environment already created in the AWS Console (e.g., via Amplify Studio)
- Amplify CLI installed locally (`npm install -g @aws-amplify/cli`)
- AWS credentials configured (`amplify configure`)

## 2. Connect Local Project to Backend
From your project root, run:

```
amplify pull --appId <your-app-id> --envName <your-env-name>
```

Example:
```
amplify pull --appId d3u3zn9j8ffav --envName dev
```

This will:
- Download the backend configuration from the cloud
- Set up the `amplify/` folder and connect your local project to the backend

## 3. Keeping Local and Cloud in Sync
- To pull the latest backend changes from the cloud, run:
  ```
  amplify pull
  ```
- To push local backend changes to the cloud, run:
  ```
  amplify push
  ```


## 4. Adding a GraphQL API (AppSync)
## 5. Adding Authentication (Cognito)
To add authentication to your Amplify backend:

1. Run the following command in your project root:
  ```
  amplify add auth
  ```
2. Follow the CLI prompts to configure authentication (default settings are usually fine to get started).

3. After setup, deploy the authentication resources to the cloud:
  ```
  amplify push
  ```
  (You may also see 'amplify push --y' in some tutorials. The '--y' flag auto-confirms prompts, but for most workflows, simply using 'amplify push' is recommended for clarity.)

This will provision Amazon Cognito resources for authentication and update your local and cloud backend environments.
To add a GraphQL API to your Amplify backend:

1. Run the following command in your project root:
  ```
  amplify add api
  ```
2. Choose **GraphQL** when prompted and follow the CLI instructions to configure your API.

3. After setup, deploy the API to the cloud:
  ```
  amplify push
  ```
  (You may also see 'amplify push --y' in some tutorials. The '--y' flag auto-confirms prompts, but for most workflows, simply using 'amplify push' is recommended for clarity.)

This will provision an AWS AppSync GraphQL API and update your local and cloud backend environments.


## 6. Using Amplify Studio
You can also manage your backend visually in the Amplify Studio web console:

- Open your environment in Amplify Studio: [Amplify Studio dev environment](https://us-east-1.admin.amplifyapp.com/admin/d3u3zn9j8ffav/dev/home)
- In Studio, you can:
  - Edit your GraphQL schema visually
  - Add or modify data models
  - Manage data in DynamoDB tables
  - Configure authentication, storage, and other backend features

### Syncing Studio and Local Changes
- After making changes in Amplify Studio (such as editing the schema), run:
  ```
  amplify pull
  ```
  to update your local project with the latest backend configuration.
- After making changes locally (such as editing schema.graphql), run:
  ```
  amplify push
  ```
  to deploy your changes to the cloud backend and Studio.

- You only need to specify `--appId` and `--envName` the first time you connect. After that, `amplify pull` and `amplify push` will use your current environment.
- If you add new backend features (API, Auth, Storage, etc.), use `amplify add <category>` and then `amplify push`.
- Your AWS credentials are stored in `~/.aws/credentials` and are not part of your project.

## 8. Integrating Amplify with React
To connect your React app to the Amplify backend:

1. Install the required packages (if you haven't already):
  ```
  npm install aws-amplify @aws-amplify/ui-react
  ```
2. Configure Amplify in your app (usually in `src/index.js` or `src/App.js`):
  ```js
  import Amplify from 'aws-amplify';
  import awsExports from './aws-exports';
  Amplify.configure(awsExports);
  ```
3. Use Amplify UI components (e.g., for authentication):
  ```js
  import { withAuthenticator } from '@aws-amplify/ui-react';

  function App() {
    // ...your app code...
  }

  export default withAuthenticator(App);
  ```

Refer to the [Amplify UI documentation](https://ui.docs.amplify.aws/react/) for more details and advanced usage.
- You only need to specify `--appId` and `--envName` the first time you connect. After that, `amplify pull` and `amplify push` will use your current environment.
- If you add new backend features (API, Auth, Storage, etc.), use `amplify add <category>` and then `amplify push`.
- Your AWS credentials are stored in `~/.aws/credentials` and are not part of your project.

## 5. Troubleshooting
- If you see errors about missing environment or appId, make sure you have run `amplify pull` with the correct parameters.
- For more help, see the [Amplify CLI docs](https://docs.amplify.aws/cli/).
