###################################
# More detailed and paged directory listings
###################################
alias ls="ls -a -gG"

###################################
# Shortcuts
###################################
alias web="cd /Applications/MAMP/htdocs"
alias bar="cd /Applications/MAMP/htdocs/localsbarguide/"
alias myip='curl ip.appspot.com'                    # myip:         Public facing IP Address


###################################
# Git :: More detailed commands
###################################
alias branches="git branch -av"
alias remotes="git remote -v"
alias status="git status"
alias favlog="git log --oneline --graph --all --decorate"
alias statsum="git log --stat --summary"


###################################
# Adding Working Directory and Branch to Command Line
###################################
if [ -f ~/.git-prompt.sh ]; then
	source ~/.git-prompt.sh
	export PS1='[\u|\W$(__git_ps1 " (%s)")]\$ '
fi

###################################
# Adding Git Autocomplete
###################################

if [ -f ~/.git-completion.bash ]; then
	source ~/.git-completion.bash
fi


##
# Setup for Android SDK for use with cordova
##

export PATH=${PATH}:$HOME/android-sdk-macosx/platform-tools:$HOME/android-sdk-macosx/tools
export ANDROID_HOME=$(dirname $(dirname $(which android)))
