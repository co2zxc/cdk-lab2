import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';

export class MingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sampleLambda = new lambda.Function(this, 'ming-lambda', {
      code: lambda.Code.asset('src/handler'),
      handler: 'app.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });
    
    const cert = new acm.Certificate(this, "Certificate", {
      domainName: "*.ecvming.net",
      validation: acm.CertificateValidation.fromDns(),
    });

    const api = new apigateway.RestApi(this, 'api', {
      restApiName: 'MingApi',
      domainName: {
        domainName: "api.ecvming.net",
        certificate: cert,
      },
    });

    const integration = new apigateway.LambdaIntegration(sampleLambda, {
      proxy: true
    });
    
    const resource = api.root.addResource('ming');
    resource.addMethod('GET', integration);
  }
}