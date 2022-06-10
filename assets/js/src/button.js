import { registerBlockStyle } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockStyle('core/button', {
	name: 'underline',
	label: __('Underline'),
	isDefault: true,
});
