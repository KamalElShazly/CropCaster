from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import NoTranscriptFound, TranscriptsDisabled, VideoUnavailable
import json
import sys

if len(sys.argv) < 2:
    print(json.dumps({
        "success": False,
        "error": "Usage: python3 get_transcript.py <video_id>"
    }))
    sys.exit(0)

video_id = sys.argv[1]
result = {"video_id": video_id}

try:
    api = YouTubeTranscriptApi()
    transcript = api.fetch(video_id, languages=['ar'])
    full_text = " ".join([fragment.text for fragment in transcript])

    result.update({
        "success": True,
        "transcript": full_text
    })

except NoTranscriptFound:
    result.update({
        "success": False,
        "error": "No transcript found"
    })

except TranscriptsDisabled:
    result.update({
        "success": False,
        "error": "Transcripts are disabled"
    })

except VideoUnavailable:
    result.update({
        "success": False,
        "error": "Video unavailable or blocked"
    })

except Exception as e:
    result.update({
        "success": False,
        "error": str(e)
    })

# Always exit cleanly so n8n doesn’t fail the Command node
print(json.dumps(result))
sys.exit(0)