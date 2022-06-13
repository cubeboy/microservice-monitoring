#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkMonitoringStack } from '../lib/cdk-monitoring-stack';
import * as account from '../resources/account';

const app = new cdk.App();
new CdkMonitoringStack(app, 'CdkMonitoringStack', {
  env: { account: account.ACCOUNT_ID, region: account.REGION },
});
