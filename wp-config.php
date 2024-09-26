<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'kumarsahil' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         's}G?^0yP3835%pd;^P{1o%$*< E e<R)G1oHW!nS^j|Oa}u3/S)AR(c1|1;r%^5b' );
define( 'SECURE_AUTH_KEY',  '$6y.H]maqANrH5;%pLhCZ^~Upo-7rUp#Q5RO)*z?6)V+e4eJ.o*lmwz%gX rHXxn' );
define( 'LOGGED_IN_KEY',    'tmXQyG:u2=?nd>HG 8sS&.|[n_eUi)~(wj>lJ4#e`e[rXsU1tTwqS7CGw9gS6zYT' );
define( 'NONCE_KEY',        '{4+=41A6pH~e3q(AGzxJdn_<|NkD9O^8$Trv9>DQ.c-*R k^h6{#FmjyRd:>q^KX' );
define( 'AUTH_SALT',        '?`+MDOv><hoBn@tzkY+j^=@mEYx[Rp%(C3 -V3<RcW8=V2q7XF+O_@c@/,2<3_HO' );
define( 'SECURE_AUTH_SALT', 'Ord$c)SutZ1Pa^XJ:x`Cz%C7z$jA[3ZViZ,+|R6w6ZzeIqkkg<Et[`ZZW@X7%U+N' );
define( 'LOGGED_IN_SALT',   's=v}{2N;/BQ Q,Hb$uqW#g?wcsnt^U8:*w4l:75oOE:*vecE;O,.:(bB3f4,K?{]' );
define( 'NONCE_SALT',       'PyV0HN`I;8gge&@L0}IY`-U6h#hTs#|/c i6gJ_z!A|DCmCM/?vgA[B Wi%GkCA?' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
