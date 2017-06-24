#!/bin/sh

errorMsg="prod処理を停止します。"

bundle exec rake assets:precompile RAILS_ENV=production
echo "コミット文言を入力してください"
read commitMsg
echo "コミットメッセージ -> $commitMsg"
echo "コミットしますか？ y(yes) or n(no)"
read isCommit
case $isCommit in
  y)
    git add -A
    git commit -m "$commitMsg"
    echo "コミットしました"
    ;;
  n)
    echo "コミットキャンセルしました。$errorMsg"
    exit
    ;;
  *)
    echo "失敗しました。$errorMsg"
    exit
    ;;
esac

echo "herokuにプッシュしますか？ y(yes) or n(no)"
read isHerokuPush
case $isHerokuPush in
  y)
    git push heroku master
    ;;
  n)
    echo "herokuにプッシュキャンセルしました。$errorMsg"
    exit
    ;;
  *)
    echo "失敗しました。$errorMsg"
    exit
    ;;
esac

echo "プッシュしますか？ y(yes) or n(no)"
read isPush
echo "ブランチは？"
read branchName
case $isPush in
  y)
    git push origin $branchName
    ;;
  n)
    echo "プッシュキャンセルしました。"
    exit
    ;;
  *)
    echo "失敗しました。"
    exit
    ;;
esac
