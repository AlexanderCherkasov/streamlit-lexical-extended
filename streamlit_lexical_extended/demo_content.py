"""Markdown used by the public example and its browser round-trip tests."""

FULL_FORMATTING_MARKDOWN = """# Complete Markdown Round Trip

## Text formatting

Plain text with **bold**, *italic*, ~~strikethrough~~, and `inline code`.

> A block quote with **bold** and *italic* content.

### Bullet list

- First bullet
- Second bullet with **bold**
- Third bullet with *italic*

### Numbered list

1. First numbered item
2. Second numbered item
3. Third numbered item

### Code block

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

---

### Table

| Feature | Input | Output |
| --- | --- | --- |
| Bold | **Enabled** | **Preserved** |
| Italic | *Enabled* | *Preserved* |
| Strike | ~~Enabled~~ | ~~Preserved~~ |

#### Heading level 4

##### Heading level 5

###### Heading level 6
"""

__all__ = ["FULL_FORMATTING_MARKDOWN"]
