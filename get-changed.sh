#!/bin/bash
if output=$(bash -c 'yarn lerna changed --loglevel=silent' 2>&1);
then
    echo "Lerna checked and have different changes"
    echo $output
    if [[ $output =~ "@berviantoleo/react-multi-crop" ]]; then
        echo "Yes in the whitelist!"
        echo "::set-output name=is_changed::true"
    else
        echo "Others packages updated!"
        echo "::set-output name=is_changed::false"
    fi
else
    echo "Nothing is changed!"
    echo "::set-output name=is_changed::false"
fi