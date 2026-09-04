#!/usr/bin/env bash
# Thin entry point — real work is in the Node scripts.
#
# Interactive (Phase 6):
#   ./scripts.sh
#   ./scripts.sh interactive
#
# Direct load:
#   ./scripts.sh load siteConfig.yaml
#   ./scripts.sh load programmes.yaml
#   ./scripts.sh load colleges.yaml
#   ./scripts.sh load navigation.yaml
#   ./scripts.sh load admissions.yaml
#   ./scripts.sh load news.yaml

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cmd="${1:-}"
file="${2:-}"

# No args, or explicit "interactive" → Phase 6 menu
if [[ -z "${cmd}" || "${cmd}" == "interactive" ]]; then
  exec node "${SCRIPT_DIR}/interactive.mjs"
fi

if [[ "${cmd}" != "load" && "${cmd}" != "sync" ]]; then
  echo "Unknown command: ${cmd}"
  echo "Use: ./scripts.sh | ./scripts.sh interactive | ./scripts.sh load <file.yaml>"
  exit 1
fi

base="$(basename "${file:-}")"

case "${base}" in
  ""|siteConfig|siteConfig.yaml)
    exec node "${SCRIPT_DIR}/sync-siteconfig.mjs" "${cmd}" "${file:-siteConfig.yaml}"
    ;;
  programmes|programmes.yaml)
    exec node "${SCRIPT_DIR}/sync-programmes.mjs" "${cmd}" "${file}"
    ;;
  colleges|colleges.yaml|navigation|navigation.yaml|admissions|admissions.yaml|news|news.yaml)
    exec node "${SCRIPT_DIR}/sync-content.mjs" "${cmd}" "${file}"
    ;;
  *)
    echo "Unknown content file: ${file}"
    exit 1
    ;;
esac
