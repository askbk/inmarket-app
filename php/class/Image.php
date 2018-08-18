<?php
/**
 * Class for handling image manipulation
 */
class Image
{
    public static function createThumbnail($path)
    {
        $paths = self::prepImgPaths($path, ".thumb.jpeg");
        $image = new Imagick($path["abs"]);

        $image->thumbnailImage(64, 0);

        $image->setImageFormat("jpeg");
        $image->setImageCompressionQuality("90");

        $image->writeImage($paths["newAbs"]);

        return $paths["newPath"];
    }

    public static function adaptImage($path)
    {
        $paths = self::prepImgPaths($path, ".profile.jpeg");
        $image = new Imagick($paths["abs"]);

        $width = $image->getImageWidth();
        $height = $image->getImageHeight();

        if ($width < $height) {
            $y = ($height - $width) / 2;

            $image->cropImage($width, $width, 0, $y);
        } else if ($width > $height) {
            $x = ($width - $height) / 2;

            $image->cropImage($height, $height, $x, 0);
        }

        $image->thumbnailImage(300, 0);

        $image->setImageFormat("jpeg");
        $image->setImageCompressionQuality("90");

        $image->writeImage($paths["newAbs"]);

        return $paths["newPath"];
    }

    private static function prepImgPaths($path, $ext)
    {
        $root = $_SERVER['DOCUMENT_ROOT'] . "/";
        $absPath =  $root . $path;
        $newPath = preg_replace('/\\.[^.\\s]{2,4}$/', $ext, $path);
        $newAbs = $root . $newPath;

        return array(
            'abs'       => $absPath,
            'newAbs'    => $newAbs,
            'newPath'   => $newPath
        );
    }
}

?>
