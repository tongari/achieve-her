class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  # before_actionで下で定義したメソッドを実行
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  #変数PERMISSIBLE_ATTRIBUTESに配列[:name]を代入
  PERMISSIBLE_ATTRIBUTES = %i(name)
  
 # 他のエラーハンドリングでキャッチできなかった時は、500エラーを発生させる
  rescue_from Exception, with: :error_500 unless Rails.env.development?

 # 404エラー
  rescue_from AbstractController::ActionNotFound, with: :error_404 unless Rails.env.development?
  rescue_from ActionController::RoutingError, with: :error_404 unless Rails.env.development?
  rescue_from ActiveRecord::RecordNotFound, with: :error_404 unless Rails.env.development?

  def error_500
    render file: "#{Rails.root}/public/500.html", layout: false, status: 500
  end

  def error_404
    render file: "#{Rails.root}/public/404.html", layout: false, status: 404
  end
  
  protected
  
    #deviseのストロングパラメーターにカラム追加するメソッドを定義
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: PERMISSIBLE_ATTRIBUTES)
      devise_parameter_sanitizer.permit(:account_update, keys: PERMISSIBLE_ATTRIBUTES)
    end
  
end
