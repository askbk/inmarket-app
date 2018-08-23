<?php

/**
 * config
 */
class Config
{
    private static $_jwtKey = "37MIPvs/BlXDamTn/X4kSoPLML5kH3s2RejVuP2Iq957S8Lp5ewofvAi7aweyij9+qBY2HRTLeeijGljSMehuw==";
    private static $_jwtAlg = "HS512";
    private static $_jwtExpiration = 6000;
    private static $_serverName = "localhost";

    public static function getJWTKey()
    {
        return self::$_jwtKey;
    }

    public static function getJWTAlg()
    {
        return self::$_jwtAlg;
    }

    public static function getJWTExpiration()
    {
        return self::$_jwtExpiration;
    }

    public static function getServerName()
    {
        return self::$_serverName;
    }
}


?>
