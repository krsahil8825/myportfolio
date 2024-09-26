import { cn } from '../../utils/helper';
import { forwardRef } from '@wordpress/element';

const Button = (
	{
		variant = 'primary',
		hasSuffixIcon = false,
		hasPrefixIcon = false,
		type = 'button',
		className,
		onClick,
		children,
		disabled = false,
		id = '',
		size = 'medium',
		...props
	},
	ref
) => {
	const variantClassNames = {
		primary:
			'text-white bg-nps-button-background border border-solid border-nps-button-background',
		secondary:
			'text-zip-body-text bg-white border border-solid border-zip-body-text',
		dark: 'text-white border border-white bg-transparent border-solid',
		link: 'text-border-secondary underline border-0 bg-transparent',
		blank: 'bg-transparent border-transparent',
	};
	const sizeClassNames = {
		base: {
			default: 'px-6 py-3',
			hasPrefixIcon: 'pl-4 pr-6 py-3',
			hasSuffixIcon: 'pl-6 pr-4 py-3',
		},
		medium: {
			default: 'px-4 py-3 h-11',
			hasPrefixIcon: 'pl-4 pr-6 py-3',
			hasSuffixIcon: 'pl-6 pr-4 py-3',
		},
		small: {
			default: 'px-5 py-2 h-[2.625rem]',
			hasPrefixIcon: 'pl-3 pr-5 py-2 h-[2.625rem]',
			hasSuffixIcon: 'pl-5 pr-3 py-2 h-[2.625rem]',
		},
	};
	const typographyClassNames = {
		base: 'text-base font-medium',
		medium: 'text-base font-medium',
		small: 'text-sm font-medium',
	};
	const borderRadiusClassNames = {
		base: 'rounded-md',
		medium: 'rounded-md',
		small: 'rounded',
	};

	const handleOnClick = ( event ) => {
		if ( !! onClick && typeof onClick === 'function' ) {
			onClick( event );
		}
	};

	return (
		<button
			type={ type }
			className={ cn(
				'group flex items-center justify-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition duration-150 ease-in-out cursor-pointer border-0',
				variantClassNames[ variant ],
				! hasPrefixIcon &&
					! hasSuffixIcon &&
					sizeClassNames[ size ].default,
				hasPrefixIcon && sizeClassNames[ size ].hasPrefixIcon,
				hasSuffixIcon && sizeClassNames[ size ].hasSuffixIcon,
				typographyClassNames[ size ],
				borderRadiusClassNames[ size ],
				disabled && 'cursor-not-allowed opacity-70',
				className
			) }
			onClick={ handleOnClick }
			ref={ ref }
			disabled={ disabled }
			{ ...( id && { id } ) }
			{ ...props }
		>
			{ children }
		</button>
	);
};

export default forwardRef( Button );
