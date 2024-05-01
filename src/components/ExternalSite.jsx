import React from 'react';

const ExternalWebsite = () => {
    // Define the URL of the external website
    const externalUrl = 'https://user-service-ib7aiys5la-el.a.run.app/';

    // Open the external website in a new tab
    window.open(externalUrl, '_self')

    return (
        <div>
            <h2>Opening Group Chat Service</h2>
        </div>
    );
};

export default ExternalWebsite;
