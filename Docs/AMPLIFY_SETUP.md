
# 🚀 AWS Amplify Setup Guide

This guide walks you through setting up AWS Amplify with your project, including both CLI and AWS Console steps for full-stack development, CI/CD, and hosting.

---

## 1. Prerequisites
- Node.js and npm installed
- AWS account
- GitHub (or other supported) repository

---

## 2. Install Amplify CLI
```sh
npm install -g @aws-amplify/cli
```

---

## 3. Configure Amplify CLI
```sh
amplify configure
```
- Follow the prompts to sign in to AWS, create an IAM user, and set up credentials.

---

## 4. Initialize Amplify in Your Project
```sh
amplify init
```
- Choose your editor, language, and environment.

---

## 5. Add Backend Features
- **Authentication:**
	```sh
	amplify add auth
	```
- **API (GraphQL/REST):**
	```sh
	amplify add api
	```
- **Storage (S3):**
	```sh
	amplify add storage
	```
- **Functions:**
	```sh
	amplify add function
	```

---

## 6. Deploy Backend to AWS
```sh
amplify push
```

---

## 7. Install Amplify Libraries in Your App
```sh
npm install aws-amplify @aws-amplify/ui-react
```

---

## 8. Configure Amplify in Your App
In your `src/index.js` or `src/App.js`:
```js
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
```

---

## 9. (Optional) Add Hosting
```sh
amplify add hosting
amplify publish
```

---

## 10. Connect Your Repo & Set Up CI/CD in AWS Console
1. Push your code to your remote repository (e.g., GitHub).
2. Go to the [AWS Console](https://console.aws.amazon.com/), search for **Amplify**.
3. Click **Get Started** under Amplify Hosting.
4. **Connect your repository** (GitHub, GitLab, Bitbucket, etc.).
5. Select your repo and branch, then follow the prompts to set up build settings.
6. Review and deploy. Amplify will build and host your app with CI/CD.

---

## ✅ You’re Done!
- Your app is now fully connected to AWS Amplify, with backend, CI/CD, and hosting.
- Make changes locally, push to your repo, and Amplify will auto-deploy!

---

### 📝 Resources
- [AWS Amplify Docs](https://docs.amplify.aws/)
- [Amplify CLI Reference](https://docs.amplify.aws/cli/)
- [Amplify Hosting](https://docs.amplify.aws/hosting/)

