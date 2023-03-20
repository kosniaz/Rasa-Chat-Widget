# Rasa-Chat-Widget
It contains a new custom chat widget. You can edit and modify UI as per your requirement.

This UI can be use in any website only have to change the URL in js/script.js file.

# Steps
1) Run the rasa using "rasa run -m models --enable-api --log-file out.log" this command so rasa enable HTTP API

2) Add the Website Name or Website IP in "js/script.js" file

  2.1) url: 'http://<WEBSITE_NAME OR WEBSITE IP>:5005/webhooks/rest/webhook'

3) Play with bot.

# Chat Widget UI
![chat_widget](https://raw.githubusercontent.com/sagarvanave/Rasa-Chat-Widget/master/Chat_Widget.png)

# Appendix: rasa http api 



Rasa server works with HTTP POST, with -H "Content-Type: application/json" and the data is like this
```
{
   "message": str,
   "sender": str
}
```

The response is a list of the following objects:

```
{
   "text": str,
   "recipient_id": str
}
```

where the `recipient_id` has always the same value as the first `sender` value that was used to initialize the conversation. 

Curl example
```
curl -X POST -H "Content-Type: application/json" --data ' { "message" : "Silence", "sender" : "VERYLONGUUUIDTOIDENTIFYCONVERSATION"}' https://hostname:port/webhooks/rest/webhook
 ```

