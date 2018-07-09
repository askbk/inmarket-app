<?php
require_once 'DB.php';
require_once 'Config.php';
require_once 'Auth.php';
require_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;

$email = $_POST["email"];
$password = $_POST["password"];

$user_id = DB::getUserId($email);

$user_id = Auth::validateCredentials($email, $password);

if (!$user_id) {
    error();
}

echo Auth::issueToken($user_id);

/*if (password_verify($password, DB::getUserPassword($user_id))) {
    $tokenId    = base64_encode(random_bytes(32));
    $issuedAt   = time();
    $notBefore  = $issuedAt + 10;             //Adding 10 seconds
    $expire     = $notBefore + 120;            // Adding 60 seconds
    $serverName = "localhost"; // Retrieve the server name from config file

    $data = [
        'iat'  => $issuedAt,         // Issued at: time when the token was generated
        'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
        'iss'  => $serverName,       // Issuer
        'nbf'  => $notBefore,        // Not before
        'exp'  => $expire,           // Expire
        'data' => [                  // Data related to the signer user
            'userId'   => $user_id, // userid from the users table
            'userName' => $email, // User name
        ]
    ];

    $secretKey = base64_decode(Config::getJWTKey());

    $jwt = JWT::encode(
        $data,      //Data to be encoded in the JWT
        $secretKey, // The signing key
        'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    );

   $unencodedArray = ['jwt' => $jwt];
   echo json_encode($unencodedArray);
} else {
    error();
}*/

function error()
{
    echo "Error: this email/password combination does not exist.";
    return;
}

?>
