// External dependencies.
import React from 'react';

// Internal dependencies.
import Tooltip from '../../../../components/tooltip/tooltip';
import { __ } from '@wordpress/i18n';
import { useStateValue } from '../../../../store/store';
import ICONS from '../../../../../icons';
import './style.scss';
import { initialState } from '../../../../store/reducer';
import { getStepIndex } from '../../../../utils/functions';

const MyFavorite = () => {
	const [ stateValue, dispatch ] = useStateValue();
	const { onMyFavorite } = stateValue;

	if ( getStepIndex( 'page-builder' ) === stateValue.currentIndex ) {
		return null;
	}

	const handleClick = ( event ) => {
		event.stopPropagation();
		dispatch( {
			type: 'set',
			onMyFavorite: ! onMyFavorite,
			siteType: '',
			siteOrder: initialState.siteOrder,
			siteBusinessType: initialState.siteBusinessType,
			selectedMegaMenu: initialState.selectedMegaMenu,
			siteSearchTerm: '',
		} );
	};

	return (
		<div
			className={ `st-my-favorite ${ onMyFavorite ? 'active' : '' }` }
			onClick={ handleClick }
		>
			<Tooltip
				content={ __( 'My Favorite', 'astra-sites' ) }
				offset={ [ 5, 20 ] }
			>
				{ ICONS.favorite }
			</Tooltip>
		</div>
	);
};

export default MyFavorite;
