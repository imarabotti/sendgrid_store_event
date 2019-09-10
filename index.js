const AWS = require('aws-sdk')
const _ = require('lodash')

exports.handler = async(event) => {

    let dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

    let event_data = JSON.parse(event.body)

    let params = {
        RequestItems: {
            "sendgrid_events": _.map(event_data, this.mapFields)
        }
    }

    let result = await dynamodb.putItem(params).promise()

    const response = {
        statusCode: 200,
        body: JSON.stringify('Saved'),
    }

    return response
}

exports.mapFields = (item) => {

    let mapped = {
        PutRequest: {
            Item: {
                "category": { S: item["category"] },
                "email": { S: item["email"] },
                "event": { S: item["event"] },
                "sg_event_id": { S: item["sg_event_id"] },
                "sg_message_id": { S: item["sg_message_id"] },
                "smtp-id": { S: item["smtp-id"] },
                "timestamp": { S: item["timestamp"] },
                "attempt": { S: item["attempt"] },
                "response": { S: item["response"] },
                "ip": { S: item["ip"] },
                "useragent": { S: item["useragent"] },
                "url": { S: item["url"] },
                "reason": { S: item["reason"] },
                "status": { S: item["status"] },
                "asm_group_id": { S: item["asm_group_id"] },
            }
        }
    }

    return JSON.stringify(mapped)
}
