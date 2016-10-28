###################################
# More detailed and paged directory listings
###################################
alias ls="ls -a -gG"

###################################
# Shortcuts
###################################
alias web="cd /Users/$USER/Documents/Code"
alias tools="cd /Users/$USER/Documents/Tools"
alias bar="cd /Users/$USER/Documents/Code/localsbarguide/"
 # myip:Public facing IP Address
alias myip='curl ip.appspot.com'
alias old-web="cd /Applications/MAMP/htdocs"
# top10, top 10 processes in cpu
alias top10="ps -eo %cpu,pid,comm | sort -nr | head -10"
alias deviceproxy="~/Documents/Tools/ntlmaps/main.py"
alias wdio-run="./node_modules/.bin/wdio wdio.conf.js"
alias shub='selenium-standalone start -- -role hub'
alias snode='selenium-standalone start -- -role node -hub http://localhost:4444/grid/register -port 5556 -maxSessions 31 -browser browserName=firefox,javascriptEnabled=true,maxInstances=10,platform=ANY -browser browserName=chrome,javascriptEnabled=true,maxInstances=10,platform=ANY -browser browserName=safari,javascriptEnabled=true,maxInstances=10,platform=ANY'
alias cwdio='node ./qa/webdriverio/spec/smoke/full_campus.js'

###################################
# Git :: More detailed commands
###################################
alias branches="git branch -av"
alias remotes="git remote -v"
alias status="git status"
alias favlog="git log --oneline --graph --all --decorate"
alias statsum="git log --stat --summary"
alias whathash="git log --oneline -n 1"
# Usage would be 'gitlast ##' to get last X commits
alias gitlast="git log --oneline -n"
alias git10Days="git log  --since=10.days"
# SHOW STATUS OF SUB MODULES
alias substatus="git submodule status"
# Show full remote settings
alias remotes="git remote --verbose"

logsearch() {
    # parameters is $1, Excpects a regex
    git log --oneline --grep=$1
}

changesearch(){
    git grep $1 $(git rev-list --all)
}

###################################
# For Homebrew:
###################################
export PATH="$HOME/.node/bin:$PATH"

###################################
# Adding Working Directory and Branch to Command Line
###################################
if [ -f /Users/$USER/Documents/Code/Notes/app/examples/.git-completion.bash ]; then
	source /Users/$USER/Documents/Code/Notes/app/examples/.git-prompt.sh
	export PS1='[\u|\W$(__git_ps1 " (%s)")]\$ '
fi

###################################
# Adding Git Autocomplete
###################################

if [ -f /Users/$USER/Documents/Code/Notes/app/examples/.git-completion.bash ]; then
	source /Users/$USER/Documents/Code/Notes/app/examples/.git-completion.bash
fi

###################################
# Adding Grunt Autocomplete. Hopefully.
###################################
eval "$(grunt --completion=bash)"

##
# Setup for Android SDK for use with cordova
##

export PATH=${PATH}:$HOME/Documents/Tools/android-sdk-macosx/platform-tools:$HOME/Documents/Tools/android-sdk-macosx/tools:$HOME/Documents/Tools/android-sdk-macosx/build-tools/22.0.1
export ANDROID_HOME=$(dirname $(dirname $(which android)))


###
# Setting Java Home. Needed for Appium.
###
export JAVA_HOME=$(/usr/libexec/java_home)


##
# Trying to specify path for NPM but will it break Android?
###
export PATH="/usr/local/bin:$PATH"