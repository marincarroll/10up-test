<?php
/**
 * @package groundhog
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
