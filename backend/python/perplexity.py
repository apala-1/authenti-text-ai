import sys
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch

# Join all arguments into a single text string (handles spaces & special characters)
text = " ".join(sys.argv[1:])

# Load GPT-2 model & tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

# Encode input
inputs = tokenizer.encode(text, return_tensors="pt")

# Get loss / perplexity
with torch.no_grad():
    outputs = model(inputs, labels=inputs)
    loss = outputs.loss
    perplexity = torch.exp(loss).item()

# Print perplexity (Node will read stdout)
print(perplexity)
