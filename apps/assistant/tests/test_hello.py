"""Hello unit test module."""

from assistant_api.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello assistant-api"
