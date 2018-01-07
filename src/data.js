import React from 'react';
import Input from 'material-ui/svg-icons/action/input';
import Polymer from 'material-ui/svg-icons/action/polymer';

const data = {
  //test data
  admin: {
    role: "Admin",
    total_users: 10,
    total_actual_amount: 100000,
    total_available_amount: 10000,
    users: [
        {
            email: "123456789",
            address:"ce91809664e549f740c38fc6d",
            actual_amount: 10000,
            available_amount:10000
        },
        
        {
            email: "123456789",
            address:"ce91809664e549f740c38fc6d",
            actual_amount: 10000,
            available_amount:10000
        },
        {
            email: "123456789",
            address:"ce91809664e549f740c38fc6d",
            actual_amount: 10000,
            available_amount:10000
        },
        {
            email: "123456789",
            address:"ce91809664e549f740c38fc6d",
            actual_amount: 10000,
            available_amount:10000
        }
    ],
    receiverTrans: [
        {
            timestamp: 123,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 0,
            amount: 1000000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 1,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 2,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 3,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 4,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        }
    ],
    senderTrans: [
        {
            timestamp: 123456789,
            amount: 10000,
            status: "sucess",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "waiting",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "fail",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "sucess",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "waiting",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "fail",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        }
    ]

  },
  user:{
    address:"f25921e2aa64e494ff00b5ab09",
    actual_amount: 100000,
    available_amount: 10000,
    role: "User",
    receiverTrans: [
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 0,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 1,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 2,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 3,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        },
        {
            timestamp: 123456789,
            referencedOutputHash:"ce91809664e549f740c38fc6d",
            referencedOutputIndex: 4,
            amount: 10000,
            sender_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
        }
    ],
    senderTrans: [
        {
            timestamp: 123456789,
            amount: 10000,
            status: "sucess",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "waiting",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "fail",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "sucess",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "waiting",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        },
        {
            timestamp: 123456789,
            amount: 10000,
            status: "fail",
            receiver_address:"a5f720c8080d81b9bd9781bf85c38c4d2"
 
        }
    ]
  }
};

export default data;
