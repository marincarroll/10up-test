import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

const coreName = 'core/media-text';
/** 
 * Register attribute for negative offset
 */
const offsetAttribute = (settings) => {
	if( typeof settings.attributes !== 'undefined' && settings.name == coreName ){
		settings.attributes = Object.assign( settings.attributes, {
			offset: {
				type: 'number',
				default: '0'
			}
		} )
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'groundhog/offset-attribute',
	offsetAttribute
);


/** 
 * Editor controls for negative offset
 */
const offsetControls = createHigherOrderComponent( ( BlockEdit ) => {
	return props => {
		if ( props.name == coreName ) {
			const { setAttributes } = props;
			const { offset } = props.attributes;

			return (
				<>
					<BlockEdit {...props} />
					<InspectorControls>
						<PanelBody title={ __('Negative Offset') }>
							<RangeControl
								allowReset
								withInputField={ false }
								resetFallbackValue="0"
								value={ offset }
								onChange={ num => setAttributes({ offset: num }) }
								max={ 25 }
							/>
						</PanelBody>
					</InspectorControls>
				</>
			)
		}

		return (
			<BlockEdit { ...props } />
		)
	}
}, 'offsetControls');

addFilter( 
   'editor.BlockEdit', 
   'groundhog/offset-controls', 
   offsetControls
);

const offsetInlineStyleFrontend = (element, blockType, attributes) => {
	if (!element) { return; }
	if (blockType.name == coreName) {
		const { offset } = attributes;
        
        if (offset > 0) {
            element.props.children.forEach( child => {
                if( child.props.className == 'wp-block-media-text__media' ) {
					const grandchild = child.props.children;
                    let { style } = grandchild.props;
					
					style = style !== undefined ? style : {};
                    style.transform = `scale(${100 + offset}%)`;

                    grandchild.props.style = style;
                }
            });
        }
	}

	return element;
}

addFilter(
	'blocks.getSaveElement',
	'groundhog/offset-inline-style-frontend',
	offsetInlineStyleFrontend
);