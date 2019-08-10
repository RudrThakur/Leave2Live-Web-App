// Send an SMS using Twilio's REST API and PHP
<?php
// Use the REST API Client to make requests to the Twilio REST API
use Twilio\Rest\Client;

require_once "vendor/autoload.php";

$sid = "AC1921f6067a0d0ceefb9046525cd5c63b"; // Your Account SID from www.twilio.com/console
$token = "61cdc09e48e29a73e3549ef37889554b"; // Your Auth Token from www.twilio.com/console

$client = new Client($sid, $token);
$message = $client->messages->create(
  '+91 9043309074', // Text this number
  array(
    'from' => '+1 415 789 3770', // From a valid Twilio number
    'body' => 'Hello from Twilio!'
  )
);

print $message->sid;