<?php
/**
 * @package groundhog
 */

define( 'GRNDHG_ASSETSURL', get_template_directory_uri() . '/assets/' );
define( 'GRNDHG_ASSETSDIR', get_template_directory() . '/assets/' );

/**
 * Enqueue theme stylesheet
 */
function groundhog_enqueue_assets() {	
	wp_enqueue_style(
		'groundhog-style', 
		get_stylesheet_uri(), 
		[ ], 
		filemtime( get_stylesheet_directory() . '/style.css' )
	);
}
add_action('enqueue_block_assets', 'groundhog_enqueue_assets');


/**
 * Enqueue script to modify core blocks
 */
function groundhog_gutenberg_script() {
	$script_path = '/js/core-mods.js';
	wp_enqueue_script( 
        'groundhog-core-mods', 
        GRNDHG_ASSETSURL . $script_path , 
        [ 'wp-blocks', 'wp-dom', 'wp-i18n' ], 
        filemtime( GRNDHG_ASSETSDIR . $script_path ), 
        true 
    );
}
add_action( 'enqueue_block_editor_assets', 'groundhog_gutenberg_script' );

/**
 * Allow for SVG uploads in Media Library
 **/
function groundhog_disable_real_mime_check( $data, $file, $filename, $mimes ) {
    $filetype = wp_check_filetype( $filename, $mimes );
    $ext    = $filetype['ext'];
    $type   = $filetype['type'];
    $proper = $data['proper_filename'];
    return compact( 'ext', 'type', 'proper_filename' );
}
add_filter( 'wp_check_filetype_and_ext', 'groundhog_disable_real_mime_check', 10, 4 );
 
function groundhog_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'groundhog_mime_types');