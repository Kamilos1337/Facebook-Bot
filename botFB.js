

const Puppeteer = require('puppeteer');
var telegram = require('telegram-bot-api');

var api = new telegram({
        token: 'API'
});

const preparePageForTests = async (page) => {
              // Pass the User-Agent Test.
              const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
                'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
              await page.setUserAgent(userAgent);

              // Pass the Webdriver Test.
              await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'webdriver', {
                  get: () => false,
                });
              });

              // Pass the Chrome Test.
              await page.evaluateOnNewDocument(() => {
                // We can mock this in as much depth as we need for the test.
                window.navigator.chrome = {
                  runtime: {},
                  // etc.
                };
              });

              // Pass the Permissions Test.
              await page.evaluateOnNewDocument(() => {
                const originalQuery = window.navigator.permissions.query;
                return window.navigator.permissions.query = (parameters) => (
                  parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
                );
              });

              // Pass the Plugins Length Test.
              await page.evaluateOnNewDocument(() => {
                // Overwrite the `plugins` property to use a custom getter.
                Object.defineProperty(navigator, 'plugins', {
                  // This just needs to have `length > 0` for the current test,
                  // but we could mock the plugins too if necessary.
                  get: () => [1, 2, 3, 4, 5],
                });
              });

              // Pass the Languages Test.
              await page.evaluateOnNewDocument(() => {
                // Overwrite the `plugins` property to use a custom getter.
                Object.defineProperty(navigator, 'languages', {
                  get: () => ['en-US', 'en'],
                });
              });
            }
 async function tryMe(Link){
var Check = [];
console.log(Link)
const puppeteer = Puppeteer.launch({args: ['--disable-features=site-per-process'], headless:false,
executablePath:'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
userDataDir: "C:/Users/Kamil/AppData/Local/Google/Chrome/User Data",
            ignoreHTTPSErrors: true,
            defaultViewport: null})

      var browser = await puppeteer;
      var page = await browser.newPage()
      await preparePageForTests(page);
      await page.goto(Link);


await Promise.all([
    await page.waitForFunction('document.getElementsByClassName("userContent").length>0', {timeout:432432423}),
]);
var Scrapping = await page.evaluate(() => {
  var Descriptions = document.getElementsByClassName("userContent");
  var All = [];
  for(var x=0; x<Descriptions.length; x++){
      All.push(Descriptions[x].innerText)
  }
  return All;
});
Check = Scrapping;





async function NewData(){
	 console.log("OLD")
  console.log(Check)
  await page.goto(Link);
  await Promise.all([
      await page.waitForFunction('document.getElementsByClassName("userContent").length>0', {timeout:432432423}),
  ]);
  var Scrapping = await page.evaluate(() => {
    var Descriptions = document.getElementsByClassName("userContent");
    var All = [];
    for(var x=0; x<Descriptions.length; x++){
        All.push(Descriptions[x].innerText)
    }
    return All;
  });
  console.log("NEW")
  console.log(Scrapping)
  var ThereIs=0;
  var NewMessage = -1;
for(var p=0; p<Scrapping.length; p++){
  ThereIs=0;
  for(var j=0; j<Check.length; j++){
    if(Scrapping[p]==Check[j]){
      ThereIs=1;
    }
  }
  if(ThereIs==0){
    NewMessage=p;
	console.log("Nie ma tego!!!");
    break;
  }
}
if(NewMessage==0){
	console.log("Tutaj jestesmy");
    Check = Scrapping;
  api.sendMessage({
    chat_id: '-349554356',
    text: Scrapping[NewMessage] + "\n" + Link
  })
  .then(function(data)
  {
    //console.log(util.inspect(data, false, null));
  })
  .catch(function(err)
  {
    console.log(err);
  });

}
}
setInterval(NewData, 10000);
}
var Group1 = 'https://www.facebook.com/groups/1958809244385024/?sorting_setting=CHRONOLOGICAL'
tryMe(Group1);
