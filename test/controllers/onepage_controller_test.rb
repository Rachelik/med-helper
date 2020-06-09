require 'test_helper'

class OnepageControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get onepage_index_url
    assert_response :success
  end

end
