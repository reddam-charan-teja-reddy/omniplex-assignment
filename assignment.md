<p align="center">
    <h1 align="center"><b>Absolute Intelligence</b></h1>
<p align="center">
    Assignment
    <br />
    <br />
  </p>
</p>

## Note

> The deployed project is a working solution but due to the limitations of Trial account
> being used for the **AzureOpenAi** and **Vercell**
> you may face the following problems
> so i recommend to test it in localhost

1. The AzureOpenAi trial account has a limit of **1k** tokens per minute and exceeding the limit will can
   throw you an error like this you can check it in the console

     - Error code: 429 - {'error': {'code': '429', 'message': 'Rate limit is exceeded. Try again in **X** seconds.'}}".
     - so make sure not exceed the limit The limit can be easily exceeded when using plugins because the data recived from the Plugin api calls are also sent to the Model so be considerate

2. Example prompt's to test the application
     1. **Nvidia stocks** for stock plugin
     2. **Delhi Weather** for Weather plugin
     3. **How to cook Noodles** for search plugin
     4. **Hola in english** for Translate Plugin
     5. **Good Morning** for chat
3. When you are testing out the deployed link You won't be able to see the chat response but you may see the plugin calls response
   because the **Vercell Hobby Plan**
   blocks the execution of any function that takes
   more than **10 seconds** since the free version of AzureOpenAi takes a lot of time
   to proccess
4. When testing the same in localhost you will be able to see the output
   if the **Rate limit is not exceeded**
   but it will take more than a minute

## Get started

To run the project locally,

1. Fork & Clone the repository

```bash
git clone https://github.com/[YOUR_GITHUB_ACCOUNT]/omniplex-assignment
```

2. Install the dependencies

```bash
yarn
```

3. Fill out secrets in `.env.local`

```bash
BING_API_KEY=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_DEPLOYMENT_ID=
AZURE_MODEL_NAME=
OPENWEATHERMAP_API_KEY=
ALPHA_VANTAGE_API_KEY=
FINNHUB_API_KEY=
DEEP_TRANSLATE_API_KEY=
```

4. fill out the details of your firebase project in firebaseConfig.js

```bash
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

```

5. Run the development server

```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Tasks Completed

1. **Login Ui Enhancement**

     Updated the login with popup followed the simillar design of claude ai and responsiveness

-    from this

     [![Old ui](https://i.postimg.cc/3w65vxrP/Screenshot-2024-12-01-101821.png)](https://postimg.cc/t1hM0yx5)

-    to this

     [![New Ui](https://i.postimg.cc/B6V6t0R6/Screenshot-2024-12-01-102605.png)](https://postimg.cc/gX3dBfzF)

2. **API Integration**:

     Added Translation plugin to the app
     from [DeepTranslateApi](https://rapidapi.com/gatzuma/api/deep-translate1). I followed the original Author's readme file to do the neccesary changes even though it's missing a lot of details i completed the Task

     [![Translate plugin](https://i.postimg.cc/4nk7WGfd/Screenshot-2024-12-01-104655.png)](https://postimg.cc/kRsg5kt3)

3. **Deployment**:

     Deployed the project on **Vercel** you can check the project [here](https://omniplex-assignment.vercel.app/)
     Could'not use Azure because the free account have **Quota of 0 instances** of Web app so followed with verceell

4. **Use of AI Tools:**

     **Github copilot** to Understand the work flow in the web app before jumping into the work, so i could be more efficient while working and spend less time debugging the errors. Understanding the codebase really helped me a lot so i was able to locate easily what things are causing the errors

## Approach to the tasks and challenges faced and their solutions

1. Since i have my mid examinations scheduled during the time i recived the assignment my first focus was to manage the Limited time i have efficiently by dividing the time for exam preparation and Completing the assignment. I outlined the Tasks i need to do and divided time for each work

1. On the first three days i spent time mostly understandding the work i need to do, the code given in the project, setting up the required accounts making the given project work without errors.
   The Issue i faced was to setting up the **env** file.

     1. Most of the Api keys required paid account so i used
        [Rapid API](https://rapidapi.com/) and made the neccesary changes to api's to be able to use those services
     2. For setting up the API i took the recruiter's advice to use the AzureOpenAi service.
        Migrating the **OpenAi** usage code to **AzureOpenAi** took a considerable amount of time(because there are not enough resources to do it). So i reffered a lot through their documentaion and discussions and fixed it partially (The tools api call deciding which plugin to be used is very fast and plugin api's are good but the final response takes a lot of time and it's not app issue but issue with the free account but it still works regardless)

1. After all the issues are fixed.
   The next day(4th) I have completed the UI enhancement of login page (popup). Made it responsive, Followed the same style of ClaudeAi show casing the features using a carousel from **shadcn/ui** etc.
1. On day 5 i have added the **Translate Plugin**. The time i spen on the first 3 days actually helped me a lot completing this Step very fastly and i was able to debug the errors faced easily. I started deploying the project to Azure but faced a problem with no available quota so i moved to vercel
1. On day 6 i completed the deployment and resolved the errors like getting the backend api routes to It's also my first experience with Serverless function so it took considerable time
     1. The issue i was'nt able to resolve is the EDGE_FUNCTION_INVOCATION_TIMEOUT(504) .
     2. This issue can be resolved by upgrading the plan of **Azure services** and moving to **Vercel pro plan**
1. On day 7 i am completing the submissions these were the issues i faced and i was able to resolve
