import 'react';

declare module 'react' {
    interface Attributes {
        'client:load'?: boolean;
        'client:visible'?: boolean;
        'client:only'?: boolean | string;
        'client:media'?: string;
        'client:idle'?: boolean;
    }
}
