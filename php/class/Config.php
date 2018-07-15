<?php

/**
 * config
 */
class Config
{
    private static $_jwtKey = "37MIPvs/BlXDamTn/X4kSoPLML5kH3s2RejVuP2Iq957S8Lp5ewofvAi7aweyij9+qBY2HRTLeeijGljSMehuw==";
    private static $_jwtAlg = "HS512";
    private static $_serverName = "localhost";
    private static $_dbUsername = "ask";
    private static $_dbPassword = "123";
    private static $_dbName = "mydb";
    private static $_jwtExpiration = 6000;

    public static function getServerName()
    {
        return self::$_serverName;
    }

    public static function getDbUserName()
    {
        return self::$_dbUsername;
    }

    public static function getDbPassword()
    {
        return self::$_dbPassword;
    }

    public static function getDbName()
    {
        return self::$_dbName;
    }

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
}


?>
