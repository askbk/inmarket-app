<?php
require_once 'Config.php';
require_once '../vendor/autoload.php';
require_once 'User.php';
use \Firebase\JWT\JWT;

/**
 * class for handling authentication
 */
class Auth
{
    //  Checks if the client has a valid Authorization header in its request
    public static function isLoggedIn()
    {
        $jwt = self::getToken();

        try {
            $secretKey = base64_decode(Config::getJWTKey());
            $token = JWT::decode($jwt, $secretKey, array('HS512'));

            return true;
        } catch (\Exception $e) {
            header("HTTP/1.0 401 Unauthorized");
            echo $e;

            return false;
        }

    }

    //  Checks if the given credentials are valid. Returns user ID if successful
    //  Otherwise, it throws an error.
    public static function validateCredentials($email, $password)
    {
        $user_id = User::getId($email);

        if ($user_id == -1) {
            header("HTTP/1.0 401 Unauthorized");
            return false;
        }

        if (password_verify($password, User::getPassword($user_id))) {
            return $user_id;
        }
        header("HTTP/1.0 401 Unauthorized");
        return false;
    }

    //  Retrieves the user ID by decrypting the JWT. Returns -1 if unsuccessful
    public static function getUserId()
    {
        $jwt = self::getToken();

        try {
            $secretKey = base64_decode(Config::getJWTKey());
            $token = JWT::decode($jwt, $secretKey, array('HS512'));

            $user_id = $token->data->userId;

            if (User::exists($user_id)) {
                return $user_id;
            }

            return -1;

        } catch (\Exception $e) {
            header("HTTP/1.0 401 Unauthorized");
            echo $e;

            return -1;
        }
    }

    //  Issues a new token to the given user.
    public static function issueToken($user_id)
    {
        $tokenId    = base64_encode(random_bytes(32));
        //  issuedAt:  When the token is issued
        $issuedAt   = time();
        //  notBefore:  When the token becomes valid
        $notBefore  = $issuedAt;
        //  expire:     When the token expires
        $expire     = $notBefore + Config::getJWTExpiration();
        // Retrieve the server name from config file
        $serverName = Config::getServerName();
        $email      = User::getName($user_id);

        /*
         * Create the token as an array
         */
        $data = [
            'iat'  => $issuedAt,         // Issued at: time when the token was generated
            'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
            'iss'  => $serverName,       // Issuer
            'nbf'  => $notBefore,        // Not before
            'exp'  => $expire,           // Expire
            'data' => [                  // Data related to the signer user
                'userId'   => $user_id, // userid from the users table
                'userName' => User::getName($user_id), // User name
            ]
        ];

        $secretKey = base64_decode(Config::getJWTKey());

        $jwt = JWT::encode(
            $data,      //Data to be encoded in the JWT
            $secretKey, // The signing key
            'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        );

       $unencodedArray = ['jwt' => $jwt, 'user_id' => $user_id];
       return json_encode($unencodedArray);
    }

    // Retrieves the token from the Authorization header in the request.
    private static function getToken()
    {
        $request = array();

        foreach (getallheaders() as $name => $value) {
            $request[$name] = $value;
        }

        $jwt = explode(" ", $request["authorization"])[1];

        return $jwt;
    }
}

?>
