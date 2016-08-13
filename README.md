# Frotz Slackbot
[![Build Status](https://travis-ci.org/jwoos/slack_zork.svg?branch=master)](https://travis-ci.org/jwoos/slack_zork)
[![Dependency Status](https://dependencyci.com/github/jwoos/slack_zork/badge)](https://dependencyci.com/github/jwoos/slack_zork)
[![Coverage Status](https://coveralls.io/repos/github/jwoos/slack_zork/badge.svg?branch=master)](https://coveralls.io/github/jwoos/slack_zork?branch=master)

This is an Express application meant to be used as a slack bot. It will let you play zork using an outbound webhook integration.

After you deploy this, make sure to get the token from the Slack configuration page and POST to `/init` with `{"token": "YOUR_TOKEN_HERE"}`. This will store the token for validation on API calls in the future.
