import { graphApiHost, graphApiVersion, graphApiParamsID, MEFields } from './config';

function graphAPIMessageURL() {
    return graphApiHost + graphApiVersion + '/' + graphApiParamsID + '/messages';
}

function graphAPIUserProfileURL(){
    return graphApiHost + graphApiVersion + '/' + graphApiParamsID;
}

function graphAPIGetAllAccountsURL(){
    return graphApiHost + graphApiVersion + '/' + graphApiParamsID + '/accounts';
}

function graphAPIAccountProfileURL(){
    return graphApiHost + graphApiVersion + '/';
}

// function 


export {
    graphAPIMessageURL,
    graphAPIUserProfileURL,
    graphAPIGetAllAccountsURL,
    graphAPIAccountProfileURL
}