wp.domReady( () => {
    wp.blocks.registerBlockStyle( 'core/button', {
        name: 'underline',
        label: wp.i18n.__('Underline'),
        isDefault: true
    } );
    wp.blocks.unregisterBlockStyle( 'core/button', [ 'fill' ] );
} )