<?php
/**
 * @package groundhog
 */

/**
 * Enqueue theme stylesheet
 */
function groundhog_enqueue_assets() {	
    $theme_path = '/assets/css/style.css';
	wp_enqueue_style(
		'groundhog-style', 
		get_template_directory_uri() . $theme_path, 
		[ ], 
		filemtime( get_template_directory() . $theme_path )
	);
}
add_action('enqueue_block_assets', 'groundhog_enqueue_assets');


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