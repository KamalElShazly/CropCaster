from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import NoTranscriptFound, TranscriptsDisabled, VideoUnavailable
import sys

if len(sys.argv) < 2:
    print("Usage: python3 get_transcript.py <video_id>", file=sys.stderr)
    sys.exit(1)

video_id = sys.argv[1]
try:
    api = YouTubeTranscriptApi()
    transcript = api.fetch(video_id, languages=['ar'])
    full_text = " ".join([fragment.text for fragment in transcript])
    print(full_text)

except NoTranscriptFound:
    print(f"No transcript found for video {video_id}.", file=sys.stderr)
    sys.exit(2)

except TranscriptsDisabled:
    print(f"Transcripts are disabled for video {video_id}.", file=sys.stderr)
    sys.exit(3)

except VideoUnavailable:
    print(f"Video unavailable or blocked: {video_id}.", file=sys.stderr)
    sys.exit(4)

except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)