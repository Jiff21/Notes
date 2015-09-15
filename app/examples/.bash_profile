###################################
# More detailed and paged directory listings
###################################
alias ls="ls -a -gG"

###################################
# Shortcuts
###################################
alias web="cd /Users/$USER/Documents/Code"
alias bar="cd /Users/$USER/Documents/Code/localsbarguide/"
 # myip:Public facing IP Address
alias myip='curl ip.appspot.com'
alias old-web="cd /Applications/MAMP/htdocs"
# top10, top 10 processes in cpu
alias top10="ps -eo %cpu,pid,comm | sort -nr | head -10"



###################################
# Git :: More detailed commands
###################################
alias branches="git branch -av"
alias remotes="git remote -v"
alias status="git status"
alias favlog="git log --oneline --graph --all --decorate"
alias statsum="git log --stat --summary"
# SHOW STATUS OF SUB MODULES
alias substatus="git submodule status"
# Show full remote settings
alias remotes="git remote --verbose"

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

export PATH=${PATH}:$HOME/android-sdk-macosx/platform-tools:$HOME/android-sdk-macosx/tools:$HOME/android-sdk-macosx/build-tools/22.0.1
export ANDROID_HOME=$(dirname $(dirname $(which android)))
