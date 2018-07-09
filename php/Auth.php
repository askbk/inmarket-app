<?php
require_once 'Config.php';
require_once 'vendor/autoload.php';
require_once 'DB.php';
use \Firebase\JWT\JWT;

/**
 * class for handling authentication
 */
class Auth
{
    public static function isLoggedIn()
    {
        $jwt = self::getToken();

        try {
            $secretKey = base64_decode(Config::getJWTKey());
            $token = JWT::decode($jwt, $secretKey, array('HS512'));

            return true;
        } catch (\Exception $e) {
            echo $e;
            if (0 <= strpos($e, "Expired")) {
                echo "Token expired";
            } else {
                echo "Bad hombre";
            }

            return false;
        }

    }

    public static function validateCredentials($email, $password)
    {
        $user_id = DB::getUserId($email);

        if ($user_id == -1) {
            return false;
        }

        if (password_verify($password, DB::getUserPassword($user_id))) {
            return $user_id;
        }

        return false;
    }

    public static function issueToken($user_id)
    {
        $tokenId    = base64_encode(random_bytes(32));
        $issuedAt   = time();
        $notBefore  = $issuedAt + 1;             //Adding 10 seconds
        $expire     = $notBefore + Config::getJWTExpiration();            // Adding 60 seconds
        $serverName = Config::getServerName(); // Retrieve the server name from config file
        $email = DB::getUserEmail($user_id);

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
                'userName' => DB::getUserEmail($user_id), // User name
            ]
        ];

        $secretKey = base64_decode(Config::getJWTKey());

        $jwt = JWT::encode(
            $data,      //Data to be encoded in the JWT
            $secretKey, // The signing key
            'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
        );

       $unencodedArray = ['jwt' => $jwt];
       return json_encode($unencodedArray);
    }

    private static function getToken()
    {
        $request = array();

        foreach (getallheaders() as $name => $value) {
            $request[$name] = $value;
        }

        $jwt = explode(" ", $request["Authorization"])[1];
        return $jwt;
    }
}

?>
