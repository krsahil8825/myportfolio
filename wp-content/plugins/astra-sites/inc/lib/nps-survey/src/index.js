import { createRoot } from '@wordpress/element';
import App from './app';

const root = createRoot( document.getElementById( 'nps-survey-root' ) );
root.render( <App /> );
